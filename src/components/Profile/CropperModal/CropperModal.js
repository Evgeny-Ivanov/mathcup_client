import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './CropperModal.css';

@inject('userStore')
@observer
class CropperModal extends Component {
  state = {
    imageSrc: null,
    isOpen: false,
  };

  handleShow = () => this.setState({ isOpen: true });

  handleClose = () => this.setState({ isOpen: false });

  handleUpdateImage = () => {
    this.refs.cropper.getCroppedCanvas().toBlob((blob) => {
      const file = new File([blob], 'avatar.png', { type: 'image/png' });
      this.props.userStore.updateUserAvatar(file);
      this.handleClose();
    });
  };

  handleSelectImage = (event) => {
    event.preventDefault();
    let files;
    if (event.dataTransfer) {
      files = event.dataTransfer.files;
    } else if (event.target) {
      files = event.target.files;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ imageSrc: reader.result });
    };
    reader.readAsDataURL(files[0]);
  };

  render() {
    const { imageSrc, isOpen } = this.state;
    const { user } = this.props.userStore;

    return (
      <Modal
        open={isOpen}
        onClose={this.handleClose}
        trigger={
          <Icon
            size='big'
            onClick={this.handleShow}
            className='profile-image-load-icon'
            name='photo'
          />
        }
      >
        <Modal.Header>Выбор области</Modal.Header>

        <Modal.Content>
          <Modal.Description>
            <Cropper
              ref='cropper'
              src={imageSrc || user.avatar}
              className='cropper'
              aspectRatio={1 / 1}
              guides={false}
            />
          </Modal.Description>
        </Modal.Content>

        <Modal.Actions>
          <label className='ui button'>
            Выбрать файл
            <input
              type='file'
              className='cropper-modal__select-image-button'
              onChange={this.handleSelectImage}
            />
          </label>

          <Button color='grey' onClick={this.handleUpdateImage}>
            Сохранить <Icon name='right chevron' />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CropperModal;
