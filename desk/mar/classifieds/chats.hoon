/-  classifieds
/+  c=classifieds
=,  format
|_  chats=(list chat:classifieds)
++  grab
  |%
  ++  noun  (list chat:classifieds)
  --
++  grow
  |%
  ++  noun  chats 
  ++  json  (chats:to-json:c chats)
  --
++  grad  %noun
--