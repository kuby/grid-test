import React, { Component } from 'react'
import { reject } from 'lodash'

const WidthProvider = require('react-grid-layout').WidthProvider;
const ResponsiveReactGridLayout = WidthProvider(require('react-grid-layout').Responsive);

export default class TestGrid extends Component {
  constructor(props) {
    super(props)

    /**
     * If you have to clean the local storage, call this method.
     */
    // this.clearLocalStorage()

    this.defaultProps = {
      cols: {lg: 30, md: 26, sm: 22, xs: 18, xxs: 14},
      rowHeight: 40,
      margin: [10,10],
      verticalCompact: true,
    }

    this.state = {
      layouts: JSON.parse(JSON.stringify(this.getFromLS('layouts') || {})),
      disabled: false,
      items: JSON.parse(JSON.stringify(this.getFromLS('items') || {data: []})),
      newCounter: JSON.parse(JSON.stringify(this.getFromLS('newcounter') || {val: 0})),
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.onLock = this.onLock.bind(this)
    // this.onAddItem = this.onAddItem.bind(this)
  }

  clearLocalStorage() {
    localStorage.removeItem('rgl-8')
  }

  getFromLS(key) {
    let ls = {};
    if (localStorage) {
      try {
        ls = JSON.parse(localStorage.getItem('rgl-8')) || {};
      } catch(e) {/*Ignore*/}
    }
    return ls[key];
  }

  saveToLS(value) {
    if (localStorage) {
      localStorage.setItem('rgl-8', JSON.stringify({
        layouts: value,
        newcounter: {val: this.state.newCounter.val},
        items: {data: this.state.items.data}
      }));
    }
  }

  onLayoutChange(layout, layouts) {
    console.log(layouts)
    this.saveToLS(layouts);
    this.setState({layouts});
  }

  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLock() {
    this.setState({ disabled: !this.state.disabled })
  }

  onAddItem(val) {
    const newItemParams = {
      w: 4,
      h: 4,
      x: this.state.items.data.length * 2 % (this.state.cols || 30),
      y: Infinity
    }

    this.setState({
      items: {
        data: this.state.items.data.concat({
          key: this.state.newCounter.val,
          val,
          initData: newItemParams,
        })
      },
      newCounter: {val: parseInt(this.state.newCounter.val, 10) + 1},
      disabled: false,
    })
  }

  onRemoveItem(i) {
    this.setState({
      items: {
        data: reject(this.state.items.data, { key: i })
      }
    });
  }

  generateItems(items) {
    return items.map((v) => {
      let dataGrid
      if (v.initData) {
        dataGrid = v.initData
      }

      return (
        <div key={`grid-item-${v.key}`} data-grid={dataGrid}>
          {this.props.components(v.val)}
          <span className="remove" onClick={this.onRemoveItem.bind(this, v.key)}>{'x'}</span>
        </div>
      )
    })
  }

  render() {
    const { disabled } = this.state

    const draggableState = disabled ? '.doesnt-exist' : null
    const resizableState = !disabled ? 'editable-grid' : ''

    return (
      <div>
        <ResponsiveReactGridLayout
          className={`layout ${resizableState}`}
          {...this.defaultProps}
          ref="rrgl"
          layouts={this.state.layouts}
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          draggableHandle={draggableState}
        >
          {this.generateItems(this.state.items.data)}
        </ResponsiveReactGridLayout>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <button onClick={this.onAddItem.bind(this, 'item1')}>{'Add Item 1'}</button>
            <button onClick={this.onAddItem.bind(this, 'item2')}>{'Add Item 2'}</button>
            <button onClick={this.onAddItem.bind(this, 'item3')}>{'Add Item 3'}</button>
            <button onClick={this.onAddItem.bind(this, 'item4')}>{'Add Item 4'}</button>
            <button onClick={this.onAddItem.bind(this, 'item5')}>{'Add Item 5'}</button>
            <button onClick={this.onAddItem.bind(this, 'item6')}>{'Add Item 6'}</button>
            <button onClick={this.onAddItem.bind(this, 'item7')}>{'Add Item 7'}</button>
          </div>
          <button onClick={this.onLock}>{(this.state.disabled ? 'Edit layout' : 'Lock layout')}</button>
        </div>
      </div>
    )
  }
}
