
CREATE TABLE IF NOT EXISTS "donut" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL);
INSERT INTO donut VALUES(1,'Chocolatey','Super Decadent');
INSERT INTO donut VALUES(2,'Glazed','Yummy');
INSERT INTO donut VALUES(3,'Sprinkle','Fun');

CREATE TABLE IF NOT EXISTS "customer" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL);
INSERT INTO customer VALUES(1,'Jack Jones');
INSERT INTO customer VALUES(2,'Jane Smith');

CREATE TABLE IF NOT EXISTS "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "customerId" integer, CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);
INSERT INTO "order" VALUES(1,'2020-07-24 08:29:55.101',1);
INSERT INTO "order" VALUES(2,'2020-07-24 09:29:55.101',2);
INSERT INTO "order" VALUES(3,'2020-07-25 10:29:55.101',1);
INSERT INTO "order" VALUES(4,'2020-07-25 11:29:55.101',2);

CREATE TABLE IF NOT EXISTS "order_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "donutId" integer, "quantity" integer NOT NULL, CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_1667f69433e132f8f1536a506b7" FOREIGN KEY ("donutId") REFERENCES "donut" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION);
INSERT INTO order_item VALUES(1,1,1,4);
INSERT INTO order_item VALUES(2,1,2,5);
INSERT INTO order_item VALUES(3,1,3,3);
INSERT INTO order_item VALUES(4,2,1,3);
INSERT INTO order_item VALUES(5,2,2,3);
INSERT INTO order_item VALUES(6,3,2,3);
INSERT INTO order_item VALUES(7,3,3,3);
INSERT INTO order_item VALUES(8,4,1,6);

CREATE TABLE IF NOT EXISTS "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar);
INSERT INTO user VALUES(1,'john','hunter2','admin');
INSERT INTO user VALUES(2,'kyle','hunter2',NULL);

DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('donut',4);
INSERT INTO sqlite_sequence VALUES('order',5);
INSERT INTO sqlite_sequence VALUES('order_item',9);
INSERT INTO sqlite_sequence VALUES('customer',3);
INSERT INTO sqlite_sequence VALUES('user',3);
