import { signInSuccess, signInStart, signInError } from "../redux/user/userSlice";
import { toggleTrue, toggleFalse } from "../redux/mainChatRedux/mainChatSlice";
import { Alert, Button, Label, Spinner,  TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import { useState } from "react"; 
import OAuth from "../components/OAuth";

export function SignIn () {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmite = async (e) => {
    e.preventDefault();

    if(!formData.password || !formData.email) {
      return dispatch(signInError("Будь ласка, заповніть усі поля"));
    }
    try {
      dispatch(signInStart());

      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if(data.success === false) {
        dispatch(signInError(data.message));
      }

      if(res.ok) {
        dispatch(signInSuccess(data));
        dispatch(toggleTrue());
        navigate('/');
      }

      return data;
    } catch (error) { 
      dispatch(signInError(error.message));
      dispatch(toggleFalse());
    }
    
  }
  
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link translate='no' to="/" className="font-bold dark:text-white text-4xl">
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-sky-500 to-green-500 rounded-lg text-white">Optima</span>
                Municipality
          </Link>
          <p className="text-sm mt-5">Ви можете увійти за допомогою електронної пошти та пароля або за допомогою Google.</p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmite}>
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
              ) : "Увійти"}
            </Button>
            <OAuth/>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Не маєте облікового запису?</span>
            <Link to="/sign-up" className="text-sky-500">Зареєструватися</Link>
          </div>
          {errorMessage && (
              <Alert className="mt-5" color='failure'>{errorMessage}</Alert>
          )}
        </div>
      </div>
    </div>
  )
}
