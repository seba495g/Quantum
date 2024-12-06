import { handleOutput, parseVariable, variables } from "./quacode";
if(i__.includes("@i quadio.q")){

    if(i__.includes("qua:in >> ")){prompt(i__.split("qua:in >> ")[1].trim());}


    /*
    * Handle input (reading values from the user or assigning to variables)
    * Syntax: qua:in >> message or qua:in >&variable> text
    */
    function handleInput(line) {
        if (!line.startsWith("qua:in >>")) return; // Skip invalid lines
        let inputCommand = line.split("qua:in >>")[1].trim();
        if (inputCommand.startsWith(">&") && inputCommand.includes(">")) {
            let varName = inputCommand.split(">")[0].substring(2).trim();
            let value = inputCommand.split(">")[1].trim();
            variables[varName] = value;
            console.log(`Variable ${varName} set to: ${value}`);
        } else {
            let userInput = prompt(inputCommand);
            console.log(`User input: ${userInput}`);
        }
    }

    /*
    * Handle conditional statements
    * Syntax: if: condition then [action]
    */
    function handleIf(line) {
        if (!line.startsWith("if:")) return; // Skip invalid lines
        let condition = line.split("if:")[1].split("then")[0].trim();
        let result = false;

        // Check condition
        if (condition.includes("==")) {
            let [varName, expectedValue] = condition.split("==").map(x => x.trim());
            if (variables[varName] !== undefined && String(variables[varName]) === expectedValue) {
                result = true;
            }
        }

        // Execute action if condition is true
        if (result) {
            let action = line.split("then")[1].trim();
            if (action.startsWith("qua:in >>")) {
                handleInput(action);
            } else if (action.startsWith("qua:out >>")) {
                handleOutput(action);
            }
        }
    }
}
/*
* Main execution
*/
export function executeQuantumCode(code) {
    let lines = code.split("\n").map(line => line.trim()).filter(line => line);
    for (let line of lines) {
        parseVariable(line);
        handleInput(line);
        handleOutput(line);
        handleIf(line);
    }
}

    // Execute the Quantum code
    executeQuantumCode(i__);

