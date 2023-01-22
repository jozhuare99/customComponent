const template = document.createElement("template")

template.innerHTML = `
<style>
label { 
    color:  green;
    display: block
}
.spantodo{
    font-size: .65rem;
    font-weight: lighter;
    color: #666;
}
</style>
<label>
    <input type="checkbox" />
    <slot></slot>
    <span class="spantodo">
        <slot name="description"></slot>
    </span>
</label>
`

class TodoItem extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        shadow.append(template.content.cloneNode(true))
        this.checkbox = shadow.querySelector("input")
    }
    static get observedAttributes(){ return ["checked"]}
    attributeChangedCallback(name, oldValue, newValue){
        if(name === "checked"){
            this.updateChecked(newValue)
        }
        // console.log(name, oldValue, newValue)
    }
    connectedCallback(){
        console.log("connected");
    }
    disconnectedCallback(){
        console.log("disconnected");
    }
    
    updateChecked(value){
        this.checkbox.checked = value != null && value !== "false"
    }
}

customElements.define("todo-item", TodoItem)
const item = document.querySelector('todo-item')
item.remove()