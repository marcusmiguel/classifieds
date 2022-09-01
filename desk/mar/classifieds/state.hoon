/-  classifieds
/+  c=classifieds
=,  format
|_  =state-0:classifieds
++  grab
  |%
  ++  noun  state-0:classifieds
  --
++  grow
  |%
  ++  noun  state-0
  ++  json  (to-json:state:c state-0)
  --
++  grad  %noun
--