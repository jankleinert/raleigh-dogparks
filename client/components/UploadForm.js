import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import querystring from 'querystring';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: null,
      uploadedFileCloudinaryUrl: ''
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
      var self = this;
      var reader = new FileReader();
      reader.onload = function(event) {
        self.saveImage(event.target.result, self.props.objId);
      };
      reader.readAsDataURL(file);
  }

  saveImage(fileData, objId) {
    var self = this;
    axios.post('/insertImage',
        querystring.stringify({
          parkId: objId,
          fileData: fileData
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        self.setState({
          uploadedFileCloudinaryUrl: response.data
        });
        self.props.addImage(response.data);
      });
  }

  render() {
    return (
      <div>
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop.bind(this)}>
          <p>Drop an image or click to select an image to upload.</p>
        </Dropzone>
        <div class="FileUpload">
        </div>
      </div>
    );
  }
}

export default UploadForm;