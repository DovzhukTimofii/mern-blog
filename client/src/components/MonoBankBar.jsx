import { useSelector } from 'react-redux';
import {useState, useEffect} from 'react';
import { debounce } from 'lodash';
import axios from 'axios';

export default function MonoBankBar() {
    const [monoRes, setMonoRes] = useState({});
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const currentDonationAmount = monoRes[3]?.balance  === null ? 0 : monoRes[3]?.balance;
    const finalDonationGoal = monoRes[3]?.goal  === null ? 0 : monoRes[3]?.goal;
    const difference = finalDonationGoal - currentDonationAmount;
    const percentage = (difference / finalDonationGoal) * 100;

    const fetchMonoInfo = async () => {
        let retries = 0;
        const delay = 1000; 
        const maxRetries = 3; 
        
        while (retries < maxRetries) {
            try {
                const response = await axios.get('https://api.monobank.ua/personal/client-info', {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Token': 'uPGIdEbJPgK_WrMahXV-pIQEZajtOx4WhjnrBG2HNQyY', 
                    },
                });
                
                if (response.status === 200) {
                    setMonoRes(response.data.jars);
                    setLoading(false);
                    return; 
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.warn('API rate limit exceeded, retrying...');
                    retries++;
                    await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, retries - 1))); 
                } else {
                    console.error('Error fetching data:', error);
                    break;
                }
            }
        }
        
        console.error('Failed to fetch data after retries');
        setLoading(false); // Update loading state even if fetching fails
    };

    const debouncedFetchMonoInfo = debounce(fetchMonoInfo, 1000);

    useEffect(() => {
        if (currentUser) {
            debouncedFetchMonoInfo();
        }
    }, []);

    return (
        <div>
            {loading ? (
                <span>Loading...</span>
            ) : (
                <div>
                    <span>{monoRes[3]?.title}:</span>
                    <span>{finalDonationGoal === 0 ? " немає кінцевої сумми збору" : percentage}</span>
                </div>
            )}
        </div>
    );
}