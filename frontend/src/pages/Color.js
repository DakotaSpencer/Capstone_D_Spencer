import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
  useParams
} from "react-router-dom";
import ColorDetails from '../components/ColorDetails/ColorDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Color = () => {
    let { hex } = useParams();
    const navigate = useNavigate();
    return (
      <div className='pages'>
        <button onClick={() => navigate(-1)} className='button'><ArrowBackIcon fontSize='large'/></button>
        <ColorDetails hex={hex}/>
      </div>
    )
}

export default Color