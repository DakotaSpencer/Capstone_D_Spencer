import React from 'react'
import { Image } from '../Image/Image'
import { Swatches } from '../Swatches/Swatches'
import { FileInput } from '../UploadButton/UploadButton'
import './imagepalette.css'
import '../ColorList/ColorList.css'

const IMAGE = 'https://i.imgur.com/pBcut2e.jpeg'

export class ImagePalette extends React.Component {
  state = {
    image: IMAGE,
    colors: [],
    hasError: false
  }

  componentDidMount() {

    const uploader = document.getElementById('uploader')
    const button = document.getElementById('file-upload')

    button.addEventListener('click', e => {
      if (uploader) {
        uploader.click()
      }

      e.preventDefault()
    })
  }

  uploadFiles = e => {
    this.setState({
      image: window.URL.createObjectURL(e.target.files[0]),
      hasError: false
    })
  }

  getColors = colors => {
    this.setState(state => ({ colors: [...colors], hasError: false }))
    console.log(this.state.colors)
  }

  handleImage = e => {
    this.isResponseOk(e.target.value)
    this.setState({ image: e.target.value })
  }

  isResponseOk = path =>
    fetch(path)
      .then(
        res => (res.status === 200 ? this.setState({ hasError: false }) : null)
      )
      .catch(err => (err ? this.setState({ hasError: true }) : null))

  render() {
    return (
      <div
        className="center-content"
        style={{height:'relative',
          flexDirection: 'column'
        }}
      >
        <div className='align-center m-2'>
          <h1 className='p-1'>Image To Palette</h1>
            <div className='share-wrapper'>
                <div className="share-img-container">
                    <Image
                      className="share-img"
                      error={this.state.hasError}
                      image={this.state.image}
                      getColors={this.getColors}
                      onError={error => this.setState({ hasError: true })}
                    />
                </div>
                <div className='share-bottom'>
                    <FileInput uploadFiles={this.uploadFiles}/>
                    
                    <div></div>
                </div>
                {this.state.colors.length > 0 ? (
                  <Swatches colors={this.state.colors}/>
                ) : null} 
          </div>
        </div>
      </div>
    )
  }
}