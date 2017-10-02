import React, { Component } from 'react'
import { reject } from 'lodash'

import { getComponentById } from './common'

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
      margin: [5,5],
      verticalCompact: true,
    }

    this.state = {
      layouts: JSON.parse(JSON.stringify(this.getFromLS('layouts') || {})),
      disabled: false,
      items: JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('items')) || { data: [] })),
      newCounter: JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem('newcounter')) || {val: 0})),
    }

    this.onLayoutChange = this.onLayoutChange.bind(this)
    this.onLock = this.onLock.bind(this)
    // this.onAddItem = this.onAddItem.bind(this)
  }

  clearLocalStorage() {
    localStorage.removeItem('rgl-8')
    localStorage.removeItem('items')
    localStorage.removeItem('newcounter')
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

  saveToLS(key, value) {
    console.log(value)
    if (localStorage) {
      localStorage.setItem('rgl-8', JSON.stringify({
        [key]: value
      }));

      localStorage.setItem('newcounter', JSON.stringify({ val: this.state.newCounter.val }))
      localStorage.setItem('items', JSON.stringify({ data: this.state.items.data }))
    }
  }

  onLayoutChange(layout, layouts) {
    console.log(layouts)
    this.saveToLS('layouts', layouts);
    this.setState({layouts});
    // this.props.onLayoutChange(layout, layouts);
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
    const removeStyle = {
      position: 'absolute',
      right: '4px',
      top: 0,
      cursor: 'pointer'
    };

    return items.map((v, i) => {
      let dataGrid
      if (v.initData) {
        dataGrid = v.initData
      }

      return (
        <div key={`grid-item-${v.key}`} data-grid={dataGrid}>
          {getComponentById(v.val)}
          <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, v.key)}>x</span>
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
