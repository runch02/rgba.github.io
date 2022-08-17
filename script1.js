class HexColorCode {
    constructor(red, green, blue, alpha) {
        this.red = red
        this.green = green
        this.blue = blue
        this.alpha = alpha

        this.showLocalStorageDataToScreen()
    }

    mainInputFunction(changedElement) {
        document.querySelector("#R-value").innerText = this.red.value
        document.querySelector("#G-value").innerText = this.green.value
        document.querySelector("#B-value").innerText = this.blue.value
        document.querySelector("#A-value").innerText = Number(this.alpha.value) / 10

        document.body.style.background = `rgb(${this.red.value}, ${this.green.value}, ${this.blue.value}), ${Number(this.alpha.value) / 10}`

        let colorCodeObject = {
            redValue: Number(this.red.value),
            greenValue: Number(this.green.value),
            blueValue: Number(this.blue.value),
            alphaValue: Number(this.alpha.value) / 10
        }

        this.saveToLocalStorage(colorCodeObject)

        this.showLocalStorageDataToScreen()
    }

    saveToLocalStorage(colorCodeObject) {
        localStorage.setItem("color", JSON.stringify(colorCodeObject))
    }

    showLocalStorageDataToScreen() {
        if (localStorage.getItem("color") === null) {
            return;
        } else {
            let parsedColorData = JSON.parse(localStorage.getItem("color"))
            // console.log(parsedColorData)

            document.querySelector("#R-value").innerText = parsedColorData.redValue
            document.querySelector("#G-value").innerText = parsedColorData.greenValue
            document.querySelector("#B-value").innerText = parsedColorData.blueValue
            document.querySelector("#A-value").innerText = parsedColorData.alphaValue

            this.red.value = parsedColorData.redValue
            this.green.value = parsedColorData.greenValue
            this.blue.value = parsedColorData.blueValue
            this.alpha.value = Number(parsedColorData.alphaValue) * 10

            document.body.style.background = `rgb(${this.red.value}, ${this.green.value}, ${this.blue.value}, ${this.alpha.value})`
        }
    }
}

// first instance of the class HexColorCode
let firstInstanceHexColorCode = new HexColorCode(
    document.querySelector("#red-value"),
    document.querySelector("#green-value"),
    document.querySelector("#blue-value"),
    document.querySelector("#alpha-value"),
)

for (let inputElement of document.querySelectorAll("input")) {
    inputElement.addEventListener("input", changedElement => firstInstanceHexColorCode.mainInputFunction(changedElement))
}

