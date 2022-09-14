/-  classifieds
/+  c=classifieds
|_  myads=(list advertisement:classifieds)
++  grab
  |%
  ++  noun  (list advertisement:classifieds)
  --
++  grow
  |%
  ++  noun  myads
  ++  json  (myads:to-json:c myads)
  --
++  grad  %noun
--