import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import '@carbon/charts/styles.css';
import RGL, { WidthProvider } from 'react-grid-layout';

// carbon core
import Close20 from '@carbon/icons-react/lib/close/20';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

import ChartStackedArea from './ChartStackedArea';

import { boardEHourlyDataSelector } from '../../selectors/board.selector';
import { isExpandDrawerSelector } from '../../selectors/app.selector';

const ReactGridLayout = WidthProvider(RGL);

const DefaultPage = (tableNumber) => {
  const isExpandDrawer = useSelector(isExpandDrawerSelector);
  const boardData = useSelector(boardEHourlyDataSelector);
  const dispatch = useDispatch();

  const [layouts, setLayouts] = useState([]);
  const [defaultLayouts, setDefaultLayouts] = useState([]);
  const [gridItem, setGridItem] = useState({
    isFullScreen: false,
    gridId: -1,
  });

  const [defaultProps, setDefaultProps] = useState({
    className: 'layout',
    rowHeight: 115,
    cols: 12,
    autoSize: true,
    isResizable: true,
    isDraggable: true,
  });

  function generateLayout() {
    const newLayouts = tableNumber.map((item, i) => {
      let w = 2;
      let h = 2;
      let x = 10;
      let y = Infinity;

      if (i === 0) {
        w = 4;
        h = 3;
        x = 0;
        y = 0;
      }

      if (i === 1) {
        w = 3;
        h = 3;
        x = 4;
        y = 0;
      }

      if (i === 2) {
        w = 5;
        h = 3;
        x = 0;
        y = 3;
      }

      if (i >= 6) {
        x = (i - 6 * 2) % defaultProps.cols;
        w = 2;
      }

      return {
        x,
        y,
        w,
        h,
        static:
          defaultProps.length > 0 &&
          defaultLayouts[i] &&
          defaultLayouts[i].static,
        i: item.toString(),
      };
    });
    setLayouts(newLayouts);
    setDefaultLayouts(newLayouts);
  }

  useEffect(() => {
    generateLayout();
  }, [tableNumber]);

  const _onLayoutChange = (layout) => {
    setLayouts(layout);
  };

  const _handleFullScreen = (itemI) => () => {
    const newGridItem = {
      isFullScreen: !gridItem.isFullScreen,
      gridId: itemI,
    };

    const newDefaultProps = {
      ...defaultProps,
      isDraggable: !newGridItem.isFullScreen,
    };

    setGridItem(newGridItem);
    setDefaultProps(newDefaultProps);
  };

  const _handleMaximize = (layouts, item) => () => {
    const newGrid = layouts.map((ele, i) => {
      if (ele.i === item) {
        return {
          ...layouts[i],
          w: 12,
          h: 12,
        };
      }
      return layouts[i];
    });
    setLayouts(newGrid);
  };

  return (
    <h1> hello</h1>
    // <ReactGridLayout
    //   {...defaultProps}
    //   key={isExpandDrawer}
    //   layout={layouts}
    //   onLayoutChange={_onLayoutChange}
    // >
    //   {console.log(tableNumber)}
    // </ReactGridLayout>
  );
};

export default DefaultPage;

const SizeStyled = styled(OverflowMenuItem)`
  opacity: ${(props) => (props.ismaximize ? 0.5 : 1)};
  pointer-events: ${(props) => (props.ismaximize ? 'none' : 'default')};
`;

const ItemStyled = styled.div`
  .contentStyled {
    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.isFullScreen &&
    css`
      position: fixed !important;
      width: 100% !important;
      height: 100% !important;
      transform: translate(-50%, -50%) !important;
      z-index: 9999;
      top: 50%;
      left: 50%;

      &::after {
        content: '';
        position: fixed;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #000;
        opacity: 0.3;
      }
      .contentStyled {
        position: absolute;
        z-index: 3;
        width: 95%;
        height: 95%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    `}
`;
