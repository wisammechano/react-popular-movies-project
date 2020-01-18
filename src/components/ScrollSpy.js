import PropTypes from "prop-types";
import React from "react";

const customThrottler = (fn, threshold = 100) => {
  // Used this instead of lodash/throttle
  // merely to make throttler code example to student
  // This is a closure
  let last;
  let timer;

  return (...args) => {
    const now = +new Date();
    const timePassed = !!last && now < last + threshold;

    if (timePassed) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        last = now;
        fn(...args);
      }, threshold);
    } else {
      last = now;
      fn(...args);
    }
  };
};

function isEqualArray(a, b) {
  return (
    a.length === b.length &&
    a.every((item, index) => {
      return item === b[index];
    })
  );
}

export default class Scrollspy extends React.Component {
  static get propTypes() {
    return {
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
      currentClassName: PropTypes.string.isRequired,
      scrolledPastClassName: PropTypes.string,
      style: PropTypes.object,
      componentTag: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
      offsetElementTop: PropTypes.number,
      offsetContainerTop: PropTypes.number,
      offsetContainerBottom: PropTypes.number,
      rootEl: PropTypes.string,
      onUpdate: PropTypes.func
    };
  }

  static get defaultProps() {
    return {
      items: [],
      currentClassName: "",
      style: {},
      componentTag: "ul",
      offsetElementTop: 0,
      offsetContainerTop: 0,
      offsetContainerBottom: 0,
      onUpdate() {}
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      targetItems: [],
      inViewState: [],
      isScrolledPast: []
    };

    // manually bind as ES6 does not apply this
    // auto binding as React.createClass does
    this._handleSpy = customThrottler(this._spy.bind(this), 200);
  }

  _initSpyTarget(items) {
    const targetItems = items.map(item => {
      return document.getElementById(item);
    });

    return targetItems;
  }

  // https://github.com/makotot/react-scrollspy/pull/45
  _fillArray(array, val) {
    let newArray = [];

    for (let i = 0, max = array.length; i < max; i++) {
      newArray[i] = val;
    }

    return newArray;
  }

  _isScrolled() {
    return this._getScrollDimension().scrollTop > 0;
  }

  _getScrollDimension() {
    const doc = document;
    const { rootEl } = this.props;
    const scrollTop = rootEl
      ? doc.querySelector(rootEl).scrollTop
      : doc.documentElement.scrollTop ||
        doc.body.parentNode.scrollTop ||
        doc.body.scrollTop;
    const scrollHeight = rootEl
      ? doc.querySelector(rootEl).scrollHeight
      : doc.documentElement.scrollHeight ||
        doc.body.parentNode.scrollHeight ||
        doc.body.scrollHeight;

    return {
      scrollTop,
      scrollHeight
    };
  }

  _getElemsViewState(targets) {
    let elemsInView = [];
    let elemsOutView = [];
    let viewStatusList = [];

    const targetItems = targets ? targets : this.state.targetItems;

    let hasInViewAlready = false;

    for (let i = 0, max = targetItems.length; i < max; i++) {
      let currentContent = targetItems[i];
      let isInView = hasInViewAlready ? false : this._isInView(currentContent);

      if (isInView) {
        hasInViewAlready = true;
        elemsInView.push(currentContent);
      } else {
        elemsOutView.push(currentContent);
      }

      const isLastItem = i === max - 1;
      const isScrolled = this._isScrolled();

      // https://github.com/makotot/react-scrollspy/pull/26#issue-167413769
      const isLastShortItemAtBottom =
        this._isAtBottom() &&
        this._isInView(currentContent) &&
        !isInView &&
        isLastItem &&
        isScrolled;

      if (isLastShortItemAtBottom) {
        elemsOutView.pop();
        elemsOutView.push(...elemsInView);
        elemsInView = [currentContent];
        viewStatusList = this._fillArray(viewStatusList, false);
        isInView = true;
      }

      viewStatusList.push(isInView);
    }

    return {
      inView: elemsInView,
      outView: elemsOutView,
      viewStatusList,
      scrolledPast:
        this.props.scrolledPastClassName &&
        this._getScrolledPast(viewStatusList)
    };
  }

  _isInView(el) {
    if (!el) {
      return false;
    }

    const {
      rootEl,
      offsetElementTop,
      offsetContainerTop,
      offsetContainerBottom
    } = this.props;
    let rootRect;

    if (rootEl) {
      rootRect = document.querySelector(rootEl).getBoundingClientRect();
    }

    const rect = el.getBoundingClientRect();
    const winH = rootEl ? rootRect.height : window.innerHeight;
    const scrollTop = this._getScrollDimension().scrollTop + offsetContainerTop;
    const scrollBottom =
      scrollTop + winH - offsetContainerBottom - offsetContainerTop;
    const elTop = rootEl
      ? rect.top - rootRect.top + scrollTop + offsetElementTop
      : rect.top + scrollTop + offsetElementTop;
    const elBottom = elTop + el.offsetHeight;

    //return elTop < referenceLine && elBottom > referenceLine;
    //console.log(Math.floor(scrollTop), Math.floor(scrollBottom));

    el.id == "overview" &&
      false &&
      console.log(
        [
          elTop,
          elBottom,
          scrollTop,
          scrollBottom,
          scrollBottom - scrollTop
        ].map(Math.round),
        elTop < scrollBottom && elBottom > scrollTop,
        el.id
      );
    return elTop < scrollBottom && elBottom > scrollTop;
  }

  _isAtBottom() {
    const { rootEl } = this.props;
    const { scrollTop, scrollHeight } = this._getScrollDimension();
    const winH = rootEl
      ? document.querySelector(rootEl).getBoundingClientRect().height
      : window.innerHeight;
    const scrolledToBottom = scrollTop + winH >= scrollHeight;

    return scrolledToBottom;
  }

  _getScrolledPast(viewStatusList) {
    if (!viewStatusList.some(item => item)) {
      return viewStatusList;
    }

    let hasFoundInView = false;

    const scrolledPastItems = viewStatusList.map(item => {
      if (item && !hasFoundInView) {
        hasFoundInView = true;

        return false;
      }

      return !hasFoundInView;
    });

    return scrolledPastItems;
  }

  _spy(scrollEvent, targets) {
    const elemensViewState = this._getElemsViewState(targets);
    const currentStatuses = this.state.inViewState;

    this.setState(
      {
        inViewState: elemensViewState.viewStatusList,
        isScrolledPast: elemensViewState.scrolledPast
      },
      () => {
        this._update(currentStatuses);
      }
    );
  }

  _update(prevStatuses) {
    if (isEqualArray(this.state.inViewState, prevStatuses)) {
      return;
    }

    this.props.onUpdate(
      this.state.targetItems[this.state.inViewState.indexOf(true)]
    );
  }

  _initFromProps() {
    const targetItems = this._initSpyTarget(this.props.items);

    this.setState({
      targetItems
    });

    this._spy(targetItems);
  }

  offEvent() {
    const el = this.props.rootEl
      ? document.querySelector(this.props.rootEl)
      : window;

    el.removeEventListener("scroll", this._handleSpy);
  }

  onEvent() {
    const el = this.props.rootEl
      ? document.querySelector(this.props.rootEl)
      : window;

    el.addEventListener("scroll", this._handleSpy);
  }

  componentDidMount() {
    this._initFromProps();
    this.onEvent();
  }

  componentWillUnmount() {
    this.offEvent();
  }

  UNSAFE_componentWillReceiveProps() {
    this._initFromProps();
  }

  render() {
    const Tag = this.props.componentTag;
    const { children, className, scrolledPastClassName, style } = this.props;
    let counter = 0;
    const items = React.Children.map(children, (child, idx) => {
      if (!child) {
        return null;
      }

      const ChildTag = child.type;
      const isScrolledPast =
        scrolledPastClassName && this.state.isScrolledPast[idx];
      const childClass = [child.props.className];
      if (this.state.inViewState[idx])
        childClass.push(this.props.currentClassName);
      if (isScrolledPast) childClass.push(this.props.scrolledPastClassName);

      return (
        <ChildTag
          {...child.props}
          className={childClass.join(" ")}
          key={counter++}
        >
          {child.props.children}
        </ChildTag>
      );
    });

    return (
      <Tag id={this.props.id} className={className} style={style}>
        {items}
      </Tag>
    );
  }
}
