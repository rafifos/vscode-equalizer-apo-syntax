import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { constants, commands, filterTypes, functions, operators } from "./documentation";
import { getTemplateContent, templates } from "./config-templates";

export function activate(context: vscode.ExtensionContext) {
  console.log("Equalizer APO Syntax Highlighter is now active");

  // Register a command to create a new Equalizer APO configuration file
  const createNewConfigCommand = vscode.commands.registerCommand(
    "equalizer-apo-syntax.createNewConfig",
    async () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage(
          "Please open a folder first to create a new Equalizer APO configuration file.",
        );
        return;
      }

      // Ask for template selection
      const templateOptions = templates.map((t) => ({
        label: t.name,
        description: t.description,
        detail: `Creates a ${t.name.toLowerCase()} template`,
      }));

      const selectedTemplate = await vscode.window.showQuickPick(templateOptions, {
        placeHolder: "Select a configuration template",
        title: "Equalizer APO Template Selection",
      });

      if (!selectedTemplate) {
        return; // User cancelled
      }

      const fileName = await vscode.window.showInputBox({
        prompt: "Enter the name for your new Equalizer APO configuration file",
        placeHolder: "config.txt",
        value: "config.txt",
      });

      if (!fileName) {
        return; // User cancelled
      }

      const filePath = path.join(
        workspaceFolders?.[0]?.uri.fsPath || "",
        fileName.endsWith(".txt") ? fileName : `${fileName}.txt`
      );

      // Check if file already exists
      if (fs.existsSync(filePath)) {
        const overwrite = await vscode.window.showWarningMessage(
          `File ${fileName} already exists. Do you want to overwrite it?`,
          "Yes",
          "No",
        );
        if (overwrite !== "Yes") {
          return;
        }
      }

      // Get template content
      const templateContent = getTemplateContent(selectedTemplate.label);

      fs.writeFileSync(filePath, templateContent);

      // Open the new file
      const document = await vscode.workspace.openTextDocument(filePath);
      await vscode.window.showTextDocument(document);

      vscode.window.showInformationMessage(
        `Created new Equalizer APO configuration file: ${fileName}`,
      );
    },
  );

  // Register a hover provider for filter types, commands, and expressions
  const hoverProvider = vscode.languages.registerHoverProvider("equalizer-apo", {
    provideHover(document, position, _token) {
      const range = document.getWordRangeAtPosition(position);
      if (!range) {
        return null;
      }

      const word = document.getText(range);
      const line = document.lineAt(position.line).text;

      // Check if we're in a filter type context
      if (/^\s*Filter(?:\s+\d+)?\s*:\s*ON\s+\w+/.test(line)) {
        if (filterTypes[word]) {
          return new vscode.Hover(new vscode.MarkdownString(filterTypes[word]));
        }
      }

      // Check for commands at the beginning of a line
      if (/^\s*\w+\s*:/.test(line)) {
        const commandMatch = line.match(/^\s*(\w+)\s*:/);
        if (commandMatch && commandMatch[1] === word && commands[word]) {
          return new vscode.Hover(new vscode.MarkdownString(commands[word]));
        }
      }

      // Check for constants, operators, and functions in expressions
      if (line.includes("`") || /^\s*(If|ElseIf|Eval)\s*:/.test(line)) {
        if (constants[word]) {
          return new vscode.Hover(new vscode.MarkdownString(constants[word]));
        }

        if (operators[word]) {
          return new vscode.Hover(new vscode.MarkdownString(operators[word]));
        }

        if (functions[word]) {
          return new vscode.Hover(new vscode.MarkdownString(functions[word]));
        }
      }

      return null;
    },
  });

  // Register a completion provider for common commands and parameters
  const completionProvider = vscode.languages.registerCompletionItemProvider("equalizer-apo", {
    provideCompletionItems(document, position, _token, _context) {
      const linePrefix = document.lineAt(position).text.substr(0, position.character);

      // Provide command completions at the start of a line
      if (/^\s*$/.test(linePrefix)) {
        const commandItems = Object.keys(commands).map((cmd) => {
          const item = new vscode.CompletionItem(cmd, vscode.CompletionItemKind.Keyword);
          item.insertText = `${cmd}: `;
          item.documentation = new vscode.MarkdownString(commands[cmd]);
          return item;
        });

        return commandItems;
      }

      // Provide filter type completions after "Filter: ON"
      if (/^\s*Filter(?:\s+\d+)?\s*:\s*ON\s*$/.test(linePrefix)) {
        const filterTypeItems = Object.keys(filterTypes).map((type) => {
          const item = new vscode.CompletionItem(type, vscode.CompletionItemKind.Value);
          item.documentation = new vscode.MarkdownString(filterTypes[type]);

          // Add appropriate snippet based on filter type
          if (type === "PK" || type === "Modal" || type === "PEQ") {
            item.insertText = new vscode.SnippetString(
              `${type} Fc \${1:1000} Hz Gain \${2:0.0} dB Q \${3:1.41}`,
            );
          } else if (type === "LP" || type === "HP") {
            item.insertText = new vscode.SnippetString(`${type} Fc \${1:1000} Hz`);
          } else if (type === "LPQ" || type === "HPQ" || type === "BP" || type === "AP") {
            item.insertText = new vscode.SnippetString(`${type} Fc \${1:1000} Hz Q \${2:0.707}`);
          } else if (
            type === "LS" ||
            type === "HS" ||
            type === "LS 6dB" ||
            type === "LS 12dB" ||
            type === "HS 6dB" ||
            type === "HS 12dB"
          ) {
            item.insertText = new vscode.SnippetString(
              `${type} Fc \${1:1000} Hz Gain \${2:0.0} dB`,
            );
          } else if (type === "NO") {
            item.insertText = new vscode.SnippetString(`${type} Fc \${1:1000} Hz`);
          } else if (type === "LSC" || type === "HSC") {
            item.insertText = new vscode.SnippetString(
              `${type} Fc \${1:1000} Hz Gain \${2:0.0} dB Q \${3:0.707}`,
            );
          } else if (type === "IIR") {
            item.insertText = new vscode.SnippetString(
              `${type} Order \${1:2} Coefficients \${2:0.0} \${3:0.0} \${4:0.0} \${5:1.0} \${6:0.0} \${7:0.0}`,
            );
          }

          return item;
        });

        return filterTypeItems;
      }

      // Provide channel completions after "Channel:"
      if (/^\s*Channel\s*:\s*$/.test(linePrefix)) {
        const channels = [
          { label: "all", description: "All channels" },
          { label: "L", description: "Left channel" },
          { label: "R", description: "Right channel" },
          { label: "C", description: "Center channel" },
          { label: "LFE", description: "Subwoofer channel" },
          { label: "RL", description: "Rear left channel" },
          { label: "RR", description: "Rear right channel" },
          { label: "RC", description: "Rear center channel" },
          { label: "SL", description: "Side left channel" },
          { label: "SR", description: "Side right channel" },
        ];

        return channels.map((ch) => {
          const item = new vscode.CompletionItem(ch.label, vscode.CompletionItemKind.Value);
          item.documentation = ch.description;
          return item;
        });
      }

      // Provide stage completions after "Stage:"
      if (/^\s*Stage\s*:\s*$/.test(linePrefix)) {
        const stages = [
          { label: "pre-mix", description: "Pre-mix stage (per-application processing)" },
          { label: "post-mix", description: "Post-mix stage (global processing)" },
          { label: "capture", description: "Capture stage (for input devices)" },
        ];

        return stages.map((stage) => {
          const item = new vscode.CompletionItem(stage.label, vscode.CompletionItemKind.Value);
          item.documentation = stage.description;
          return item;
        });
      }

      // Provide expression completions inside backticks or after If/ElseIf/Eval
      if (linePrefix.includes("`") || /^\s*(If|ElseIf|Eval)\s*:\s*/.test(linePrefix)) {
        const constantItems = Object.keys(constants).map((name) => {
          const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Constant);
          item.documentation = new vscode.MarkdownString(constants[name]);
          return item;
        });

        const functionItems = Object.keys(functions).map((name) => {
          const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Function);
          item.documentation = new vscode.MarkdownString(functions[name]);

          // Add function signature as snippet
          if (
            name === "abs" ||
            name === "sin" ||
            name === "cos" ||
            name === "tan" ||
            name === "sinh" ||
            name === "cosh" ||
            name === "tanh" ||
            name === "ln" ||
            name === "log" ||
            name === "log10" ||
            name === "exp" ||
            name === "sqrt" ||
            name === "strlen" ||
            name === "tolower" ||
            name === "toupper" ||
            name === "sizeof"
          ) {
            item.insertText = new vscode.SnippetString(`${name}(\${1:value})`);
          } else if (name === "min" || name === "max" || name === "sum") {
            item.insertText = new vscode.SnippetString(`${name}(\${1:value1}, \${2:value2})`);
          } else if (name === "str2dbl") {
            item.insertText = new vscode.SnippetString(`${name}("\${1:string}")`);
          } else if (name === "regexSearch") {
            item.insertText = new vscode.SnippetString(`${name}("\${1:pattern}", \${2:string})`);
          } else if (name === "regexReplace") {
            item.insertText = new vscode.SnippetString(
              `${name}("\${1:pattern}", \${2:string}, "\${3:replacement}")`,
            );
          } else if (name === "readRegString" || name === "readRegDWORD") {
            item.insertText = new vscode.SnippetString(`${name}("\${1:key}", "\${2:value}")`);
          }

          return item;
        });

        const operatorItems = Object.keys(operators).map((name) => {
          const item = new vscode.CompletionItem(name, vscode.CompletionItemKind.Operator);
          item.documentation = new vscode.MarkdownString(operators[name]);
          return item;
        });

        return [...constantItems, ...functionItems, ...operatorItems];
      }

      return undefined;
    },
  });

  // Register a document formatting provider to help with indentation
  const formattingProvider = vscode.languages.registerDocumentFormattingEditProvider(
    "equalizer-apo",
    {
      provideDocumentFormattingEdits(document, _options, _token) {
        const edits: vscode.TextEdit[] = [];
        let indentLevel = 0;

        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i);
          const text = line.text;

          // Skip empty lines and comments
          if (text.trim() === "" || text.trim().startsWith("#")) {
            continue;
          }

          // Check if line is a valid command
          const isCommand = /^\s*\w+\s*:/.test(text);

          if (isCommand) {
            // Decrease indent for EndIf
            if (/^\s*EndIf\s*:/.test(text)) {
              indentLevel = Math.max(0, indentLevel - 1);
            }

            // Calculate the current indentation
            const currentIndent = text.match(/^\s*/)?.[0] || "";
            const desiredIndent = " ".repeat(indentLevel * 4);

            // Only create an edit if the indentation needs to change
            if (currentIndent !== desiredIndent) {
              edits.push(
                vscode.TextEdit.replace(
                  new vscode.Range(i, 0, i, currentIndent.length),
                  desiredIndent,
                ),
              );
            }

            // Increase indent after If, ElseIf, Else
            if (/^\s*(If|ElseIf|Else)\s*:/.test(text)) {
              indentLevel++;
            }
          }
        }

        return edits;
      },
    },
  );

  // Register a semantic token provider to highlight invalid lines as comments
  const tokenProvider = vscode.languages.registerDocumentSemanticTokensProvider(
    "equalizer-apo",
    {
      provideDocumentSemanticTokens(document, _token) {
        const builder = new vscode.SemanticTokensBuilder();

        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i);
          const text = line.text.trim();

          // Skip empty lines and explicit comments
          if (text === "" || text.startsWith("#")) {
            continue;
          }

          // Check if line is a valid command format
          const isValidCommand = /^\w+\s*:/.test(text);

          // If not a valid command, mark as comment
          if (!isValidCommand) {
            builder.push(line.range, "comment", []);
          }
        }

        return builder.build();
      },
    },
    new vscode.SemanticTokensLegend(["comment"]),
  );

  context.subscriptions.push(
    createNewConfigCommand,
    hoverProvider,
    completionProvider,
    formattingProvider,
    tokenProvider,
  );
}

export function deactivate() {}
