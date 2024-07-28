# ProLearn Code Editor

ProLearn Code Editorは、RustとReactを使用したプログラミング学習支援ツールです。このツールは、Monaco Editorを使ってコードエディタを提供し、バックエンドにはRustを使用しています。

## 環境構築手順

### 前提条件

- Node.js (v14以上)
- npm (Node.jsに含まれています)
- RustとCargo
- PostgreSQL
- Diesel CLI

### フロントエンドのセットアップ

1. プロジェクトのルートディレクトリに移動します。

    ```sh
    cd path/to/your/project
    ```

2. フロントエンドディレクトリに移動します。

    ```sh
    cd frontend
    ```

3. 必要な依存関係をインストールします。

    ```sh
    npm install
    ```

4. 開発用サーバーを起動します。

    ```sh
    npm start
    ```

### バックエンドのセットアップ

1. プロジェクトのルートディレクトリに移動します。

    ```sh
    cd path/to/your/project
    ```

2. バックエンドディレクトリに移動します。

    ```sh
    cd backend
    ```

3. `.env` ファイルを作成し、データベース接続情報を設定します。

    ```env
    DATABASE_URL=postgres://your_username:your_password@localhost/your_database
    ```

4. Diesel CLIをインストールします。

    ```sh
    cargo install diesel_cli --no-default-features --features postgres
    ```

5. データベースをセットアップします。

    ```sh
    diesel setup
    ```

6. マイグレーションを生成します。

    ```sh
    diesel migration generate create_users
    ```

7. マイグレーションファイルを編集します。

    `migrations/<timestamp>_create_users/up.sql`

    ```sql
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        password VARCHAR NOT NULL
    );
    ```

    `migrations/<timestamp>_create_users/down.sql`

    ```sql
    DROP TABLE users;
    ```

8. マイグレーションを実行します。

    ```sh
    diesel migration run
    ```

9. 必要な依存関係をインストールします。

    ```sh
    cargo build
    ```

10. バックエンドサーバーを起動します。

    ```sh
    cargo run
    ```

## アプリケーションの起動方法

1. フロントエンドとバックエンドをそれぞれ別のターミナルで起動します。

2. フロントエンド用ターミナル:

    ```sh
    cd path/to/your/project/frontend
    npm start
    ```

3. バックエンド用ターミナル:

    ```sh
    cd path/to/your/project/backend
    cargo run
    ```

4. ブラウザで `http://localhost:3000` にアクセスします。

## テストの実行

### フロントエンドのテスト

1. フロントエンドディレクトリに移動します。

    ```sh
    cd path/to/your/project/frontend
    ```

2. テストを実行します。

    ```sh
    npm test
    ```

### バックエンドのテスト

1. バックエンドディレクトリに移動します。

    ```sh
    cd path/to/your/project/backend
    ```

2. テストを実行します。

    ```sh
    cargo test
    ```

## デプロイ

デプロイ方法については、後で追加します。

## 貢献

貢献を歓迎します！バグ報告、機能リクエスト、プルリクエストは大歓迎です。

## ライセンス

このプロジェクトはMITライセンスの下でライセンスされています。
