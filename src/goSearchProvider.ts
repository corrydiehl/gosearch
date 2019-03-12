import * as vscode from 'vscode';
import * as https from 'https';
import url = require('url');

import { BaseTreeNode } from "./baseTreeNode";
import { ISearchResult } from './searchResult';

export class GoSearchProvider implements vscode.TreeDataProvider<BaseTreeNode> {

  private searchResults: ISearchResult | undefined;

  onDidChangeTreeData?: vscode.Event<BaseTreeNode | null | undefined> | undefined;  getTreeItem(element: BaseTreeNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
    throw new Error("Method not implemented.");
  }
  getChildren(element?: BaseTreeNode | undefined): vscode.ProviderResult<BaseTreeNode[]> {
    console.log("Tried to getChildren");
    throw new Error("Method not implemented.");
  }

  public async executeSearch<T>(term: string): Promise<T> {
    return this.httpsRequest({
      // https://go-search.org/api?action=search&q=<searchTerm>
      hostname: 'go-search.org',
      port: 443,
      path: `/api?action=search&q=${term}`,
      method: 'GET'
    }).then((data) => {
      console.log(data);
      return JSON.parse(data);
    });
  }

  private convertToOptions(options: https.RequestOptions | string): https.RequestOptions {
    if (typeof options === 'string') {
        // Must use Node's url, not vscode.Uri
        let optionsAsUrl = url.parse(options);
        return <https.RequestOptions>optionsAsUrl;
    } else {
        return options;
    }
  }

  private async httpsRequest(opts: https.RequestOptions | string): Promise<string> {
    let convertedOpts = this.convertToOptions(opts);
    convertedOpts.headers = convertedOpts.headers || {};
    convertedOpts.headers.Accept = 'application/json';
    // let convertedOpts = opts;

    return new Promise<string>((resolve, reject) => {
        let req = https.request(convertedOpts, (res) => {
            let data = '';
            res.on('data', (d: string) => {
                data += d;
            });
            res.on('end', () => {
                resolve(data);
            });
        });
        req.end();
        req.on('error', reject);
    });
  }
}