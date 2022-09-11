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
  ++  json  (to-json:chats:c chats)
  --
++  grad  %noun
--