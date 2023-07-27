import './header.css';
import { Button} from 'antd';
import { useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function Header(props){
    const [loadings, setLoadings] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = true;
          return newLoadings;
        });
    
        setTimeout(() => {
          setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = false;
            navigate('/');
            return newLoadings;
          });
        }, 2000);

    };
    return(
        <div className='header'>
            <h1>Crypto Exchange</h1>
            {(currentPath !== "/" && currentPath !== "/signup") && <Button style={{marginLeft: '800px', backgroundColor: '#21252c', color: 'white'}} type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Log Out
        </Button>}</div>
    );
}

export default Header;