import { Send } from '@material-ui/icons';
import { PhotoOutlined, GifRounded, EmojiEmotionsOutlined, Cancel} from '@material-ui/icons';
import React, { useContext, useRef, useState } from 'react'
import './share.css'
import '../App.css'
import './ColorList.css'
//import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ImageToPalette = () => {
    //const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);





    





    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
        //userID: user._id,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                console.log(file.name);
            } catch (err) {}
        }
        try {
            console.log("Window was supposed to reload");
        } catch (err) {}
    };


    return (
    <div className='App m-2'>
      <h1 className='p-1'>Image To Palette</h1>
        <div className='share-wrapper'>
            {file && (
            <div className="share-img-container">
                <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                <div className='italics'>{file.name}</div>
                <div className='bold'>{"( " + file.size + " bytes )"}</div>
                <Cancel className="share-cancel-img" onClick={() => setFile(null)} />
            </div>
            )}
            <form className='share-bottom' onSubmit={submitHandler}>
                <div className='share-options'>
                    <label htmlFor="file" className='share-option'>
                        <PhotoOutlined className='share-icon'/>
                        <span className='share-option-text'>Photo</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <div></div>
                    </label>
                </div>
                <button className='share-button' type='submit'>
                    <Send className='send-btn'/><span>Generate!</span>
                </button>
            </form>
        </div>
    </div>
    )
}

export default ImageToPalette