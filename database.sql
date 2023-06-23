create database saep;
use saep;

create table produtos(
id_produto int primary key auto_increment,
nome varchar(255)
);

create table usuarios(
id_usuario int primary key auto_increment,
usuario varchar(255),
email varchar(255),
cpf varchar(15),
senha varchar(255)
);

create table islikeds(
id_isliked int primary key auto_increment,
dislike int,
id_produto int,
id_usuario int,
foreign key (id_produto) references produtos(id_produto),
foreign key (id_usuario) references usuarios(id_usuario)
);

create table favoritos(
id_favorito int primary key auto_increment,
id_usuario int,
id_produto int,
foreign key(id_usuario) references usuarios(id_usuario),
foreign key(id_produto) references produtos(id_produto)
);