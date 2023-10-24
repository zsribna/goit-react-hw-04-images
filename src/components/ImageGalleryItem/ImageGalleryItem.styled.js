import styled from "styled-components";

export const GalleryImg = styled.img`
  width: 100%;
     height: 260px;
     object-fit: cover;
     transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
  transform: scale(1.03);
  cursor: zoom-in;
  }
`;
export const ModalStyled = {
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: '0',
    bottom: '0',
    transform: 'translate(-50%, -50%)',
    background: 'transparent',

    padding: 0,
    border: 0,
    maxWidth: 'calc(100% - 48px)',
    maxHeight: 'calc(100% - 24px)',
  },
};



