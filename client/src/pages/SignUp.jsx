import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
export function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmite = async (e) => {
    e.preventDefault();

    if(!formData.username || !formData.password || !formData.email) {
      setLoading(false);
      return setErrorMessage("Будь ласка, заповніть усі поля");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if(res.ok) {
        navigate('/sign-in');
      }

      return data;
    } catch (error) { 
      setErrorMessage(error.message);
      setLoading(false);
    }
    
  }
  
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-green-500 rounded-lg text-white">Optima</span>
                Municipality
          </Link>
          <p className="text-sm mt-5">Ви можете зареєструватися за допомогою електронної пошти та пароля або через Google.</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmite}>
            <div>
              <Label value="Ваше ім'я користувача"/>
              <TextInput type="text" placeholder="Ім'я" id="username" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Ваша електронна пошта"/>
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
            </div>
            <div>
              <Label value="Ваш пароль"/>
              <TextInput type="password" placeholder='Пароль' id="password" onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='greenToBlue' type="submite" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm"/>
                  <span className="pl-3">Завантаження ...</span>
                </>
              ) : "Зареєструватися"}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>У вас є вже акаунт?</span>
            <Link to="/sign-in" className="text-sky-500">Увійти</Link>
          </div>
          {errorMessage && (
              <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  )
}
