/-  *classifieds
/+  c=classifieds
|_  favs=(list favorite)
++  grab
  |%
  ++  noun  (list favorite)
  --
++  grow
  |%
  ++  noun  favs
  ++  json  (favorites:to-json:c favs)
  --
++  grad  %noun
--