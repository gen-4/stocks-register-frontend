import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import user from 'modules/user';


const Logout = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        dispatch(user.actions.logout());
        navigator('/'); 
    });
    
    return null;
}

export default Logout;
