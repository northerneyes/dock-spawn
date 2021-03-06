dockspawn.Dialog = function(panel, dockManager)
{
    this.panel = panel;
    this.zIndexCounter = 1000;
    this.dockManager = dockManager;
    this.eventListener = dockManager;
    this._initialize();
    this.dockManager.context.model.dialogs.push(this);
        this.position = dockManager.defaultDialogPosition;

    this.dockManager.notifyOnCreateDialog(this);

};

dockspawn.Dialog.prototype.saveState = function(x, y){
    this.position = {x: x, y: y};
    this.dockManager.notifyOnChangeDialogPosition(this, x, y);
};

dockspawn.Dialog.fromElement = function(id, dockManager)
{
    return new dockspawn.Dialog(new dockspawn.PanelContainer(document.getElementById(id), dockManager), dockManager);
};

dockspawn.Dialog.prototype._initialize = function()
{
    this.panel.floatingDialog = this;
    this.elementDialog = document.createElement('div');
    this.elementDialog.appendChild(this.panel.elementPanel);
    this.draggable = new dockspawn.DraggableContainer(this, this.panel, this.elementDialog, this.panel.elementTitle);
    this.resizable = new dockspawn.ResizableContainer(this, this.draggable, this.draggable.topLevelElement);

    document.body.appendChild(this.elementDialog);
    this.elementDialog.classList.add("dialog-floating");
    this.elementDialog.classList.add("rounded-corner-top");
    this.panel.elementTitle.classList.add("rounded-corner-top");

    this.mouseDownHandler = new dockspawn.EventHandler(this.elementDialog, 'mousedown', this.onMouseDown.bind(this));
    this.resize(this.panel.elementPanel.clientWidth, this.panel.elementPanel.clientHeight);
    this.isHidden = false;
    this.bringToFront();
};

dockspawn.Dialog.prototype.setPosition = function(x, y)
{
    this.position = {x: x, y: y};
    this.elementDialog.style.left = x + "px";
    this.elementDialog.style.top = y + "px";
    this.dockManager.notifyOnChangeDialogPosition(this, x, y);
};

dockspawn.Dialog.prototype.getPosition = function()
{
    return { left:  this.position.x , top: this.position.y };
};

dockspawn.Dialog.prototype.onMouseDown = function(e)
{
    this.bringToFront();
};

dockspawn.Dialog.prototype.destroy = function()
{
    if (this.mouseDownHandler)
    {
        this.mouseDownHandler.cancel();
        delete this.mouseDownHandler;
    }
    this.elementDialog.classList.remove("rounded-corner-top");
    this.panel.elementTitle.classList.remove("rounded-corner-top");
    removeNode(this.elementDialog);
    this.draggable.removeDecorator();
    removeNode(this.panel.elementPanel);
     this.dockManager.context.model.dialogs.remove(this);
    delete this.panel.floatingDialog;
};

dockspawn.Dialog.prototype.resize = function(width, height)
{
    this.resizable.resize(width, height);
};

dockspawn.Dialog.prototype.setTitle = function(title)
{
    this.panel.setTitle(title);
};

dockspawn.Dialog.prototype.setTitleIcon = function(iconName)
{
    this.panel.setTitleIcon(iconName);
};

dockspawn.Dialog.prototype.bringToFront = function()
{
    this.elementDialog.style.zIndex = this.zIndexCounter++;
};

dockspawn.Dialog.prototype.hide = function()
{
    this.elementDialog.style.zIndex = 0;
    this.elementDialog.style.display = 'none';
     if(!this.isHidden)
    {
        this.isHidden = true;
        this.dockManager.notifyOnHideDialog(this); 
    } 
};

dockspawn.Dialog.prototype.show = function()
{
    this.elementDialog.style.zIndex = 1000;
    this.elementDialog.style.display = 'block';
    if(this.isHidden)
    {
        this.isHidden = false;
        this.dockManager.notifyOnShowDialog(this);   
    } 
};