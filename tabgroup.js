class AppCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.setAttribute('role', 'radio');
        this.setAttribute('tabindex', '-1');
        this.setAttribute('aria-checked', 'false');
    }

}

window.customElements.define('app-card', AppCard);

//arrow key codes
const ARROW_LEFT = 37
const ARROW_UP = 38
const ARROW_RIGHT = 39
const ARROW_DOWN = 40

class AppGroup extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.setAttribute('role', 'tabgroup')
        this.radios = Array.from(this.querySelectorAll('app-card'))

        if (this.hasAttribute('selected')) {
            let selected = this.getAttribute('selected')
            this._selected = selected
            this.radios[selected].setAttribute('tabindex', 0)
            this.radios[selected].setAttribute('aria-checked', true)

        } else {
            this._selected = 0
            this.radios[0].setAttribute('tabindex', 0)
        }

        this.addEventListener('keydown', this.handleKeyDown.bind(this))
        this.addEventListener('click', this.handleClick.bind(this))
    }

    handleKeyDown(e) {
        switch (e.keyCode) {

            case ARROW_LEFT:
            case ARROW_UP: {

                e.preventDefault();
                if (this.selected === 0) {
                    this.selected = this.radios.length - 1
                } else {
                    this.selected--
                }
                break
            }
            case ARROW_RIGHT:
            case ARROW_DOWN: {

                e.preventDefault();
                if (this.selected === this.radios.length - 1) {
                    this.selected = 0
                } else {
                    this.selected++
                }
                break
            }

        }

    }

    handleClick(e) {
        //handle click even on radio button and label
        // let btnID = e.target.id || e.target.htmlFor
        // let btnClicked = btnID.substr(btnID.length - 1)
        // this.selected = btnClicked - 1
    }

    set selected(idx) {
        if (isFinite(this.selected)) {
            let prevSelected = this.radios[this.selected]
            prevSelected.tabindex = -1
            prevSelected.setAttribute('aria-checked', false)
        }

        let newSelected = this.radios[idx]
        newSelected.tabindex = 0
        newSelected.focus()
        newSelected.setAttribute('aria-checked', true)

        this.setAttribute('selected', idx)
        this._selected = idx
    }

    get selected() {
        return this._selected
    }
}

window.customElements.define('app-group', AppGroup)