/-  *classifieds
/+  gossip, default-agent, dbug
::
/$  grab-ad  %noun  %classifieds-advertisement
/$  grab-ads  %noun  %classifieds-advertisements
::
|% 
+$  versioned-state
  $%  state-0
  ==  
+$  state-0
  $:  %0
      ads=(map ship advertisements)
      myads=advertisements
  ==
::   
+$  eyre-id  @ta
+$  card  card:agent:gall
--
::
=|  state-0
=*  state  -
%-  %+  agent:gossip
      [1 %mutuals %mutuals]
    %-  malt
    ^-  (list [mark $-(* vase)])
    :~  [%classifieds-advertisement |=(n=* !>((grab-ad n)))]
        [%classifieds-advertisements |=(n=* !>((grab-ads n)))]
    ==
::
%-  agent:dbug
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  :_  this
  [%pass /eyre/connect %arvo %e %connect [~ /[dap.bowl]] dap.bowl]~
::
++  on-save
  ^-  vase
  !>(state)
::
++  on-load
  |=  old-state=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old-state)
  ?-  -.old
    %0  `this(state old)
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
    %classifieds-action
      =/  act  !<(action vase)
      ?-  -.act
          %pub-advertisement
        ?>  =(our.bowl src.bowl)
        ::
        :: TODO: Validate title/desc lenght
        ::
        =/  ad  [our.bowl (sham eny.bowl) now.bowl forward.act title.act desc.act price.act img-uris.act]
        :_  this(myads (weld myads ~[ad])) 
        [(invent:gossip %classifieds-advertisement !>(ad))]~
      ::
      :: TODO: Add delete-ad use case
      ::
      ==
  ==
::
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?+  sign-arvo  (on-arvo:def wire sign-arvo)
      [%eyre %bound *]
    ~?  !accepted.sign-arvo
      [dap.bowl 'eyre bind rejected!' binding.sign-arvo]
    [~ this]
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  ?=([%http-response *] path)  [~ this]
  ?.  =(/~/gossip/source path)
    (on-watch:def path)
  :_  this
  [%give %fact ~ %classifieds-advertisements !>([now.bowl myads])]~
::
++  on-peek 
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %classifieds-advertisements %all ~]
    ``json+!>([now.bowl myads])
  ==
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ?.  ?&  =(/~/gossip/gossip wire)
          ?=(%fact -.sign)
      ==
    (on-agent:def wire sign)
  ?+  p.cage.sign  (on-agent:def wire sign)
    %classifieds-advertisements
      =/  newads  !<(advertisements-payload q.cage.sign)
      `this(ads (~(gas by ads) ~[[src.bowl +.newads]]))
    %classifieds-advertisement
      =/  newad  !<(advertisement q.cage.sign)
      =/  newlist  (weld (~(got by ads) src.bowl) [newad ~])
      `this(ads (~(gas by ads) ~[[src.bowl newlist]]))
  ==
::  
++  on-fail   on-fail:def
++  on-leave  on-leave:def
--
