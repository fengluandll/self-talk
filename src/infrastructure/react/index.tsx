import { render } from "react-dom";
import React from "react";
import { ApplicationInitializer } from "../../application/application-initializer";
import { DocumentCreator } from "../../application/document-creator";
import { DocumentLister } from "../../application/document-lister";
import { DocumentUpdater } from "../../application/document-updater";
import { IDocument } from "../../domain/document";
import { SignInManager } from "../../application/sign-in-manager";
import { SignOutManager } from "../../application/sign-out-manager";
import { TextImageInserter } from "../../application/text-image-inserter";
import { GlobalStyle } from "./style";
import { App } from "./App";

export class ReactRenderer {
  constructor(
    private readonly applicationInitializer: ApplicationInitializer,
    private readonly documentCreator: DocumentCreator,
    private readonly documentLister: DocumentLister,
    private readonly documentUpdater: DocumentUpdater,
    private readonly signInManager: SignInManager,
    private readonly signOutManager: SignOutManager,
    private readonly textImageInserter: TextImageInserter,
    private readonly repositoryURL: string
  ) {}

  public render(element: HTMLElement): void {
    render(
      <>
        <App
          createDocument={(text: string) => this.documentCreator.create(text)}
          initialize={() => this.applicationInitializer.initialize()}
          insertImages={(
            text: string,
            position: number,
            images: File[]
          ): Promise<string> =>
            this.textImageInserter.insert(text, position, images)
          }
          listDocuments={() => this.documentLister.list()}
          repositoryURL={this.repositoryURL}
          signIn={() => this.signInManager.signIn()}
          signOut={() => this.signOutManager.signOut()}
          updateDocument={(document: IDocument, text: string) =>
            this.documentUpdater.update(document, text)
          }
        />
        <GlobalStyle />
      </>,
      element
    );
  }
}
