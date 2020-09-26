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

    appendNumber(number){
        if (number === '.' && this.expression.includes(number)) return;
        if (isFinite(this.currentOperand) && this.previousOperand != ''){
          this.clear();
        }
        this.expression += number;
        this.currentOperand += number;
    
    }

    formattedNumber(number){
      let integerPart = number.split(',')[0];
      let precisionPart = number.split(',')[1];

      if (integerPart.length > 3){
        integerPart = parseFloat(integerPart).toLocaleString("en-US");
      }
      if (precisionPart != undefined){
        return `${integerPart}.${precisionPart}`;
      } else {
        return integerPart;
      }
    }

    chooseOperator(operator){
      if (this.expression == '') return;
      let validOperator = '';
      switch (operator){
        case 'x':
          validOperator = '*';
          break;
        case '+': 
          validOperator = '+';
          break;
        case '-': 
          validOperator = '-';
          break;
        case '÷':
          validOperator = '/';
          break;
        default:
          return
      }
      this.expression += validOperator;
      this.currentOperand += operator;
    }

    delete(){
      if (this.previousOperand != ''){
        this.clear();
        return;
      }
      this.expression = this.expression.slice(0,-1);
    }

    clear(){
        this.expression = '';
        this.previousOperand = '';
        this.currentOperand = '';
    }

    calculate(){
      if (this.expression== '') return;
        let res = eval(this.expression).toString();
        this.previousOperand = this.currentOperand;
        this.expression = res;
    }

    updateDisplay(){
      if (isFinite(this.expression) || this.expression == ''){
        this.currentOperand = this.formattedNumber(this.expression);
      } else {
        let lastNumInExpression = this.expression.split(/[-\/\*+]/).pop();
        let lastNumInCurrent = this.currentOperand.split(/[-÷x+]/).pop();
        if (lastNumInExpression != ''){
          let indexOflastNumInCurrent = this.currentOperand.lastIndexOf(lastNumInCurrent);
          this.currentOperand = this.currentOperand.slice(0, indexOflastNumInCurrent) + this.formattedNumber(lastNumInExpression);
      }
    }
      this.currentOperandTextElement.innerText = this.currentOperand ==''? '0': this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;

    }
}
const calculator = new Calculator(previousOperand, currentOperand);
numberButtons.forEach( button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
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
