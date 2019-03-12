// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { GoSearchProvider } from './goSearchProvider';
import { ISearchResult } from './searchResult';

export let searchResults: [ISearchResult];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const provider = new GoSearchProvider();
	vscode.window.registerTreeDataProvider('goSearchProvider', provider);

	vscode.commands.registerCommand('goSearch.search', () => {
		handleSearchRequest(provider);
	});
	vscode.commands.registerCommand('goSearch.explorer.search', () => {
		handleSearchRequest(provider);
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}

function handleSearchRequest(provider: GoSearchProvider) {
	vscode.window.showInputBox({
		prompt: "Please enter your search term"
	}).then((retVal) => {
		if (retVal !== undefined && retVal !== "") {
			vscode.window.showInformationMessage(`You searched for ${retVal}`);
			provider.executeSearch<ISearchResult>(retVal).then((data) => {
				console.log(data);
				searchResults.push(data);
			});
		}
	});
}
