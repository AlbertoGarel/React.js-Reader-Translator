
export interface SelectedLanguage {
  value: string;
  textLang: string;
}

export interface SelectedLanguages {
  playTextUser: SelectedLanguage | undefined;
  playTextTrad: SelectedLanguage | undefined;
}
