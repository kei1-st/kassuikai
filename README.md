# kassuikai

- 筑波大学医学水泳部のホームページです
- Nextjs で構築されています
- Cloudflare Pages　にデプロイしています
- GoogleCalendar で管理された日程を GoogleCalendarAPI を通じて取得し表示しています
- GoogleAuth の Refresh Token 更新は今のところ手動ですが https://github.com/kei1-st/kassuikai/issues/58 で近々対処する予定です

## Development
1. 適当なブランチを作成し、ローカル環境でコードを修正します
2. 以下のコマンドでフォーマッタを適用してください
    - `yarn run fix`
    - eslint と prettier のフォーマットが走ります
3. 以下のコマンドでビルドできることを確認してください
    - `yarn run build`
4. ビルドが通ることを確認できたら変更をコミットしてリモートにプッシュしてください
5. https://github.com/kei1-st/kassuikai/pulls からPRを作成します
    - PR上に作業ブランチのビルド成果物のプレビュー用URLが発行されますので、デバッグに役立ててください
