# Databases

_Fastcampus Node Databases 강의 내용을 정리해둔 자료입니다._

## PostgreSQL

- 설치 후 `psql postgres` 로 shell 실행

### 명령어

- `\d` => List of relations.
- `\list` => List of Databases.
- `create user myuser with encrypted password 'mypass';`
  - 'mypass' 라는 패스워드를 가진 'myuser' db 사용자를 생성
- `psql -U myuser -d fc21 -h localhost --password`

### node + postgres(pg)

- query를 날릴 때 sql에 직접 문자열 대입 주의(SQL Injection)
  - `$1::text`를 이용해 Injection용 코드가 문자열 자체로 인식되게끔
  - `::` : Type cast

### commander

- `^8.3.0` 버전에서는 `command().action()` 이후에 `program.parse()`가 필요하다.

### Sequelize

- ORM(Object Relational Mapping)
- `sequelize.sync()` : dev mode에서는 큰 상관없지만 prod mode에서는 주의.

### Sequelize-cli

- migration을 사용할 때 cli를 사용
- init 이후 config.json 설정
- migrate 이후 `SequelizeMeta` table은 migration 적용한 파일

#### 명령어

- `cli init` : 기본적인 템플릿 제공
- `cli -- migration:generate --name initialize` : initialize라는 migration 생성
- `cli db:migrate` : migration up 동작
- `cli db:migrate:undo` : migration down 동작

## GraphQL(graphql, vscode(extensions: graphql for vscode))

- Facebook에서 2015년에 발표한 새로운 API 규격
- type system을 기본적으로 갖추고 있어 REST보다 훨씬 개발 과정이 안정적
- Apollo, Prisma 등의 오픈 소스 툴들이 있음
- 쿼리 형태가 자유롭기 때문에 스펙 변경에 대해 굉장히 유연하게 대처 가능
- `Query`: GET
- `Mutation`: POST, DELETE, UPDATE
- SDL(Schema Definition Language)로 무엇을 질의할 수 있고 무엇을 돌려받을 수 있는지 기술

```GraphQL
type Book {
  title: String
  author: String
}

type Query {
  books(search: String): [Book]
}
```

## Apollo server(apollo-server)

```GraphQL
query Query {
  users {
    name
    age
    city {
      name
      users {
        name
      }
    }
  }
}
```
