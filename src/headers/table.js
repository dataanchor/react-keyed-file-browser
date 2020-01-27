import PropTypes from 'prop-types'
import React from 'react'
import ClassNames from 'classnames'

import { DropTarget } from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import { BaseFileConnectors } from './../base-file.js'
import ReactTooltip from 'react-tooltip'

class RawTableHeader extends React.Component {
  static propTypes = {
    select: PropTypes.func,
    fileKey: PropTypes.string,

    connectDropTarget: PropTypes.func,
    isOver: PropTypes.bool,
    isSelected: PropTypes.func,
    path: PropTypes.any,

    browserProps: PropTypes.shape({
      createFiles: PropTypes.func,
      moveFolder: PropTypes.func,
      moveFile: PropTypes.func,
    }),
  }

  handleHeaderCspanck(event) {
    this.props.select(this.props.fileKey)
  }

  render() {
    const header = (
      <tr
        className={ClassNames('folder', {
          dragover: this.props.isOver,
          selected: this.props.isSelected,
        })}
      >
        <th>File</th>
        {this.props.path ? <th className="path" style={{ textAlign: 'center' }}>Path</th> : null}
        <th className="active" style={{ textAlign: 'center' }}>
          Active <a data-tip data-for="info"><span>&#9432;</span></a>
          <ReactTooltip id="info" effect="solid" place="right">
            <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column' }}>
              <p>If set to <strong>No</strong>, it means:</p>
              <span>&#9679; The file is either no longer anchorized or</span>
              <span>&#9679; The file is moved from the folder or</span>
              <span>&#9679; The file is deleted from the folder</span>
              <br />
              <p>If <strong>Yes</strong>,</p>
              <span>&#9679; The file is actively used by the user.</span>
            </div>
          </ReactTooltip>
        </th>
        <th className="size">Size</th>
        <th className="modified">Last Modified</th>
      </tr>
    )

    if (
      typeof this.props.browserProps.createFiles === 'function' ||
      typeof this.props.browserProps.moveFile === 'function' ||
      typeof this.props.browserProps.moveFolder === 'function'
    ) {
      return this.props.connectDropTarget(header)
    } else {
      return header
    }
  }
}

@DropTarget(
  ['file', 'folder', NativeTypes.FILE],
  BaseFileConnectors.targetSource,
  BaseFileConnectors.targetCollect,
)
class TableHeader extends RawTableHeader {}

export default TableHeader
export { RawTableHeader }
