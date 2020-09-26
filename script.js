const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const acButton = document.querySelector('[data-all-clear]');
const delButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');

class Calculator{
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    append(character){
        if (character === '.' && this.operation.includes(character)) return;
        if (isFinite(this.currentOperand)){
          this.clear();
        }
        this.currentOperand = this.currentOperand + character;

    }

    chooseOperator(operator){
      if (this.currentOperand == '') return

      switch (operator){
        case 'x':
          operator = '*';
          break;
        case '+': case '-': case '/':
          break;
        default:
          return
      }
      this.currentOperand = this.currentOperand + operator;
    }

    delete(){
      this.currentOperand = this.currentOperand.slice(0, -1);
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = [];
    }

    calculate(){
      if (this.currentOperand == '') return;
        let res = eval(this.currentOperand);
        this.previousOperand = this.currentOperand;
        this.currentOperand = res;

    }

    updateDisplay(){
      this.currentOperandTextElement.innerText = this.currentOperand==''? '0': this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}
const calculator = new Calculator(previousOperand, currentOperand);
numberButtons.forEach( button => {
  button.addEventListener("click", () => {
    calculator.append(button.innerText);
    calculator.updateDisplay();
  });
});
operatorButtons.forEach( button => {
    button.addEventListener("click", () => {
      calculator.chooseOperator(button.innerText);
      calculator.updateDisplay();
    });
  });

equalsButton.addEventListener( 'click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

delButton.addEventListener('click',()=> {
  calculator.delete();
  calculator.updateDisplay();
})

acButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})
