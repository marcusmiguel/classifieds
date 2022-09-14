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
  ++  json  (state:to-json:c state-0)
  --
++  grad  %noun
--