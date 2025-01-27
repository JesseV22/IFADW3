CREATE TABLE "Groups" (
  "grupoid" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "codigo" VARCHAR(255) NOT NULL,
  "descricao" VARCHAR(255) NOT NULL,
  "removido" BOOLEAN DEFAULT false
);

CREATE TABLE "Menus" (
  "menuid" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "codigo" VARCHAR(255) NOT NULL,
  "descricao" VARCHAR(255) NOT NULL,
  "nivel" INTEGER NOT NULL,
  "removido" BOOLEAN DEFAULT false
);

CREATE TABLE "GroupMenus" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "groupId" UUID REFERENCES "Groups"("grupoid"),
  "menuId" UUID REFERENCES "Menus"("menuid"),
  "removido" BOOLEAN DEFAULT false
);

INSERT INTO "Groups" ("codigo", "descricao") VALUES ('GRP001', 'Grupo de Teste 1');
INSERT INTO "Menus" ("codigo", "descricao", "nivel") VALUES ('MNU001', 'Menu de Teste 1', 1);
INSERT INTO "GroupMenus" ("groupId", "menuId") VALUES (
  (SELECT "grupoid" FROM "Groups" WHERE "codigo" = 'GRP001'),
  (SELECT "menuid" FROM "Menus" WHERE "codigo" = 'MNU001')
);
