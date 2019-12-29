import React, {Component} from 'react';
import '../styles/image_link.css'

class ImageLinkForm extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <p className='f3'>{'This Magic Brain will detect faces in your pictures. Give it a try'}</p>
                <div className='center'>
                    <div className=' form center pa4 br3 shadow-5 center'>
                        <input className='f4 pa2 w-70 center ' type='text' id='input1' onChange={this.props.input_change}/> <br/>
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ' id='bt1' onClick={this.props.click}>Detect
                        </button>
                    </div>
                </div>
            </div>


        );
    }
}

export default ImageLinkForm;