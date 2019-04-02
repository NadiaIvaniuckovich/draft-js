/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 * @emails oncall+draft_js
 */
'use strict';

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var getFragmentFromSelection = require("./getFragmentFromSelection");
/**
 * If we have a selection, create a ContentState fragment and store
 * it in our internal clipboard. Subsequent paste events will use this
 * fragment if no external clipboard data is supplied.
 */


function editOnCopy(editor, e) {
  var editorState = editor._latestEditorState;
  var selection = editorState.getSelection();
  var result = editor.props.handleBeforeCopy && editor.props.handleBeforeCopy(editorState, e);

  if (typeof result === 'object') {
    editorState = (_readOnlyError("editorState"), result);
  } // No selection, so there's nothing to copy.


  if (selection.isCollapsed()) {
    e.preventDefault();
    return;
  }

  editor.setClipboard(getFragmentFromSelection(editorState));
}

module.exports = editOnCopy;