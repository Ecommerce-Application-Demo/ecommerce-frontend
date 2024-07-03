import React from 'react'
import Modal from './Modal-global';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const SocialShare = ({onClose, shareUrl}) => {

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(' ' + shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Modal width='400px' height='300px' onClose={onClose}>
      <FacebookShareButton url={shareUrl} >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <div onClick={handleWhatsAppShare}>
        <WhatsappIcon size={32} round />
      </div>
    </Modal>
  )
}

export default SocialShare
