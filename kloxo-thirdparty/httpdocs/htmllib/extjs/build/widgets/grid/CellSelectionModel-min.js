/*
 * Ext JS Library 1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext.grid.CellSelectionModel=function(_1){Ext.apply(this,_1);this.selection=null;this.addEvents({"beforecellselect":true,"cellselect":true,"selectionchange":true});};Ext.extend(Ext.grid.CellSelectionModel,Ext.grid.AbstractSelectionModel,{initEvents:function(){this.grid.on("mousedown",this.handleMouseDown,this);this.grid.getGridEl().on(Ext.isIE?"keydown":"keypress",this.handleKeyDown,this);var _2=this.grid.view;_2.on("refresh",this.onViewChange,this);_2.on("rowupdated",this.onRowUpdated,this);_2.on("beforerowremoved",this.clearSelections,this);_2.on("beforerowsinserted",this.clearSelections,this);if(this.grid.isEditor){this.grid.on("beforeedit",this.beforeEdit,this);}},beforeEdit:function(e){this.select(e.row,e.column,false,true,e.record);},onRowUpdated:function(v,_5,r){if(this.selection&&this.selection.record==r){v.onCellSelect(_5,this.selection.cell[1]);}},onViewChange:function(){this.clearSelections(true);},getSelectedCell:function(){return this.selection?this.selection.cell:null;},clearSelections:function(_7){var s=this.selection;if(s){if(_7!==true){this.grid.view.onCellDeselect(s.cell[0],s.cell[1]);}this.selection=null;this.fireEvent("selectionchange",this,null);}},hasSelection:function(){return this.selection?true:false;},handleMouseDown:function(e,t){var v=this.grid.getView();if(this.isLocked()){return;}var _c=v.findRowIndex(t);var _d=v.findCellIndex(t);if(_c!==false&&_d!==false){this.select(_c,_d);}},select:function(_e,_f,_10,_11,r){if(this.fireEvent("beforecellselect",this,_e,_f)!==false){this.clearSelections();r=r||this.grid.dataSource.getAt(_e);this.selection={record:r,cell:[_e,_f]};if(!_10){var v=this.grid.getView();v.onCellSelect(_e,_f);if(_11!==true){v.focusCell(_e,_f);}}this.fireEvent("cellselect",this,_e,_f);this.fireEvent("selectionchange",this,this.selection);}},isSelectable:function(_14,_15,cm){return!cm.isHidden(_15);},handleKeyDown:function(e){if(!e.isNavKeyPress()){return;}var g=this.grid,s=this.selection;if(!s){e.stopEvent();var _1a=g.walkCells(0,0,1,this.isSelectable,this);if(_1a){this.select(_1a[0],_1a[1]);}return;}var sm=this;var _1c=function(row,col,_1f){return g.walkCells(row,col,_1f,sm.isSelectable,sm);};var k=e.getKey(),r=s.cell[0],c=s.cell[1];var _23;switch(k){case e.TAB:if(e.shiftKey){_23=_1c(r,c-1,-1);}else{_23=_1c(r,c+1,1);}break;case e.DOWN:_23=_1c(r+1,c,1);break;case e.UP:_23=_1c(r-1,c,-1);break;case e.RIGHT:_23=_1c(r,c+1,1);break;case e.LEFT:_23=_1c(r,c-1,-1);break;case e.ENTER:if(g.isEditor&&!g.editing){g.startEditing(r,c);e.stopEvent();return;}break;}if(_23){this.select(_23[0],_23[1]);e.stopEvent();}},acceptsNav:function(row,col,cm){return!cm.isHidden(col)&&cm.isCellEditable(col,row);},onEditorKey:function(_27,e){var k=e.getKey(),_2a,g=this.grid,ed=g.activeEditor;if(k==e.TAB){if(e.shiftKey){_2a=g.walkCells(ed.row,ed.col-1,-1,this.acceptsNav,this);}else{_2a=g.walkCells(ed.row,ed.col+1,1,this.acceptsNav,this);}e.stopEvent();}else{if(k==e.ENTER&&!e.ctrlKey){ed.completeEdit();e.stopEvent();}else{if(k==e.ESC){ed.cancelEdit();}}}if(_2a){g.startEditing(_2a[0],_2a[1]);}}});