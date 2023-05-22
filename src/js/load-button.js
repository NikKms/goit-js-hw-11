class LoadMoreButton {
  static classNames = {
    hidden: 'hidden',
  };

  constructor({ buttonElement, isHidden = false }) {
    this.button = buttonElement;
    isHidden && this.hideButton();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hideButton() {
    this.button.classList.add(LoadMoreButton.classNames.hidden);
  }

  showButton() {
    this.button.classList.remove(LoadMoreButton.classNames.hidden);
  }

  disableButton() {
    this.button.disabled = true;
    this.button.textContent = 'Loading...';
  }

  enableButton() {
    this.button.disabled = false;
    this.button.textContent = 'Load more';
  }
}

export { LoadMoreButton };
