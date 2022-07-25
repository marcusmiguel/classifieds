/-  *classifieds
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  [%0 ads=(list advertisement)]
+$  card  card:agent:gall
--
::
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
    %classifieds-action
      =/  act  !<(action vase)
      ?-  -.act
        %pub-advertisement
        =/  ad  [publisher=our.bowl date=now.bowl title=title.act desc=desc.act]
        `this(ads (weld ads ~[ad]))
      ==
  ==
::
++  on-arvo   on-arvo:def
++  on-init   on-init:def
++  on-save
  ^-  vase
  !>(state)
::
++  on-load   on-load:def
++  on-watch  on-watch:def
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-fail   on-fail:def
--