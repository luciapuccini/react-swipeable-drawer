import { Component } from "react";

const START_TRANSLATION = -10;
const STOP_TRANSLATION = 100;

class Drawer extends Component {
  state = {
    swiping: false,
    scrolling: false,
    translation: START_TRANSLATION,
    clientX: 0,
    clientY: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { translation } = this.state;
    if (
      translation !== prevState.translation &&
      translation === START_TRANSLATION
    ) {
      window.scrollTo(0, this.mainContentScroll);
    }
  }

  mainContentScroll = 0;

  saveScrollPosition = () => {
    const { translation } = this.state;
    if (translation === START_TRANSLATION) {
      this.mainContentScroll = window.pageYOffset;
    }
  };

  toggleDrawer = () => {
    this.saveScrollPosition();
    this.setState(({ translation }) => ({
      translation: translation > 50 ? START_TRANSLATION : STOP_TRANSLATION,
    }));
  };

  handleTouchStart = event => {
    this.saveScrollPosition();
    const { clientX, clientY } = event.targetTouches[0];
    this.setState({ swiping: true, clientX, clientY });
  };

  handleTouchMove = size => event => {
    const {
      clientX: prevClientX,
      clientY: prevClientY,
      scrolling,
    } = this.state;

    const maxWidth = window.innerWidth;
    const maxHeigth = window.innerHeight;
    const { clientX, clientY } = event.targetTouches[0];

    const diffTranslateX = Math.abs(clientX - prevClientX);
    const diffTranslateY = Math.abs(clientY - prevClientY);

    if (scrolling || diffTranslateY > diffTranslateX) {
      this.setState({
        scrolling: true,
        translation: Math.min(
          ((maxHeigth - clientY) / ((maxHeigth * size) / 100)) * 100,
          STOP_TRANSLATION
        ),
      });
    } else {
      this.setState({
        translation: Math.min(
          (clientX / ((maxWidth * size) / 100)) * 100,
          STOP_TRANSLATION
        ),
      });
    }
  };

  handleTouchEnd = () => {
    this.setState(({ translation }) => ({
      swiping: false,
      scrolling: false,
      translation: translation < 50 ? START_TRANSLATION : STOP_TRANSLATION,
    }));
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { position, size, children } = this.props;
    const { swiping, translation } = this.state;

    return children({
      position,
      size,
      swiping,
      translation,
      mainContentScroll: this.mainContentScroll,
      toggleDrawer: this.toggleDrawer,
      handleTouchStart: this.handleTouchStart,
      handleTouchMove: this.handleTouchMove,
      handleTouchEnd: this.handleTouchEnd,
    });
  }
}

export default Drawer;

export { default as DrawerContainer } from "./DrawerContainer";
export { default as DrawerOverlay } from "./DrawerOverlay";
export { default as DrawerContentContainer } from "./DrawerContentContainer";
export { default as MainContentContainer } from "./MainContentContainer";
