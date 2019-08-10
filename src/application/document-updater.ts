import {
  IDocument,
  formatDocument,
  validateDocument
} from "../domain/document";
import { formatErrorMessage } from "../domain/error";
import { DocumentDeleter } from "./document-deleter";
import { IDocumentRepository } from "./document-repository";
import { IMessagePresenter } from "./message-presenter";

export class DocumentUpdater {
  constructor(
    private readonly documentDeleter: DocumentDeleter,
    private readonly documentRepository: IDocumentRepository,
    private readonly messagePresenter: IMessagePresenter
  ) {}

  public async update(
    originalDocument: IDocument,
    text: string
  ): Promise<IDocument | null> {
    const document = formatDocument({ ...originalDocument, text });

    if (!document.text) {
      await this.documentDeleter.delete(document.id);
      return null;
    }

    try {
      validateDocument(document);
    } catch (error) {
      await this.messagePresenter.present(formatErrorMessage(error));
      return originalDocument;
    }

    await this.documentRepository.update(document);

    return document;
  }
}
