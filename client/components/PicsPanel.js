import React from 'react';
import axios from 'axios';
import UploadForm from './UploadForm'

class PicsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      messageFromServer: '',
      images: []
    }
    this.getPicsData = this.getPicsData.bind(this);
    this.addImage = this.addImage.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.getPicsData(this);
  }

  onClick() {
    alert('this comes from picspanel');
  }

  addImage(url) {
    this.state.images.push(url);
    this.setState({images: this.state.images});
  }

  getPicsData(ev) {
    axios.get('/getImages?id=' + this.props.objId)
    .then(function(response) {
      if(response.data.length > 0) {
        ev.setState({images: response.data});
      } else {
        ev.setState({images: []});
      }
    })
    .catch(error => console.log(error));  
  }

  render() {
      return (
        <div>
          <UploadForm
            objId = {this.props.objId}
            addImage = {this.addImage}/>
          {this.state.images.length == 0 ? 
            <div class="pic-label">No pictures from this park yet.</div> : 
            <div class="pic-label">Cute pictures from this park:</div>          
          }
          <div class='image-grid'>
            {this.state.images.map((urls) => 
              <img className='park-image' key={'img-${idx}'} src={urls} height='50'/>
            )}
          </div>
        </div> 
      );
  }
}

export default PicsPanel;
