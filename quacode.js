while (true){
    if(run==true){
        let variables = {}; // Variable storage
        if(i__.includes("qua:out >> ")){console.log(i__.split("qua:in >> ")[1].trim());}
        /*
        * Parse variable creation and assignment
        * Syntax: &variable = value
        */
        function parseVariable(line) {
            if (line.startsWith("&") && line.includes("=")) {
                let parts = line.substring(1).split("=").map(part => part.trim());
                const name = parts[0];
                let value = parts[1];

                // Determine the type of value
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1); // String
                } else if (value === "true" || value === "false") {
                    value = value === "true"; // Boolean
                } else if (!isNaN(Number(value))) {
                    value = Number(value); // Number
                } else {
                    console.error(`Invalid value for variable: ${value}`);
                    return;
                }

                // Store the variable
                variables[name] = value;
                console.log(`Variable created: ${name} = ${value}`);
            }
        }

        /*
        * Handle output (printing to the console)
        * Syntax: qua:out >> message or qua:out >> "variableName"
        */
        function handleOutput(line) {
            if (!line.startsWith("qua:out >>")) return; // Skip invalid lines
            try {
                let output = line.split("qua:out >>")[1].trim();
                if (output.startsWith('"') && output.endsWith('"')) {
                    let varName = output.slice(1, -1); // Extract variable name
                    if (variables[varName] !== undefined) {
                        console.log(variables[varName]);
                    } else {
                        console.error(`Error: Variable "${varName}" not found.`);
                    }
                } else {
                    console.log(output); // Print raw message
                }
            } catch (error) {
                console.error(`Error processing output: ${error.message}`);
            }
        }
        alert("worked")
        run=false
    }
}
export { handleOutput, parseVariable, variables };