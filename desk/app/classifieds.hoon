/-  *classifieds
/+   gossip, default-agent, dbug
::
/$  grab-ad  %noun  %classifieds-advertisements
::
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0  $:  %0
                 ads=advertisements
                 myads=advertisements
                 :: TODO: Add saved ads functionality
                 :: TODO: We need a way to tell the others ships that we wiped our ads(via |nuke %classifieds).
             ==     
::
+$  eyre-id  @ta
+$  card  card:agent:gall
--
::
=|  state-0
=*  state  -
%-  %+  agent:gossip
      [1 %anybody %anybody]
    %+  ~(put by *(map mark $-(* vase)))
      %classifieds-advertisements
    |=(n=* !>((grab-ad n)))
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
  ~&  old
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
        =/  ad  [publisher=our.bowl date=now.bowl title=title.act desc=desc.act]
        :_  this(myads (weld myads ~[ad])) 
        [(invent:gossip %classifieds-advertisements !>(`advertisements`~[ad]))]~
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
  [%give %fact ~ %classifieds-advertisements !>(`advertisements`myads)]~
::
++  on-peek 
  |=  =path
  ^-  (unit (unit cage))
  ?+  path  (on-peek:def path)
    [%x %classifieds-advertisements %all ~]
    ``json+!>(myads)
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ?.  ?&  =(/~/gossip/gossip wire)
          ?=(%fact -.sign)
          =(%classifieds-advertisements p.cage.sign)
      ==
    ~&  [dap.bowl %strange-sign wire sign]
    (on-agent:def wire sign)
  =/  newads  !<(advertisements q.cage.sign)
  `this(ads (weld ads newads))  
::
++  on-fail   on-fail:def
++  on-leave  on-leave:def
--