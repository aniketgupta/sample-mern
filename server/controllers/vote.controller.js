import Vote from '../models/vote';
var vote = new Vote();
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';


export function addVote (req, res) {
  console.log(req.body.data.name);
  Vote.findOne({
    name: req.body.data.name
  }, function (err, result) {
    if (err) console.log(err);
    if (result) {
      const votes = result.votes + 1;
      Vote.update({
        "name" : req.body.data.name
      }, {
        $set:{
          votes: votes
        }
      }, function(err, result) {
          if(err) {
            res.json({
              status: false,
              error: 'Error in givin vote'
            });
          } else {
            res.json({
              status: true,
              success: 'Your vote has been added'
            });
          }

      });
    } else {
      const data = {
        name: req.body.data.name,
        votes: 1
      }
      const newVote = new Vote(data);
       newVote.save((err, saved) => {
        if (saved) {
          res.json({
              status: true,
              success: 'Your vote has been added'
            });
        } else {
          res.json({
              status: false,
              error: 'Error in givin vote'
          });
        }
      });
    }
  });
}

/**
 * Get total votes
 * @param req
 * @param res
 * @returns void
 */

export function getTotalVotesKaran(req, res) {
  Vote.find({"name": "karan"}).exec((err, karan) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ status: true,
      data: karan
       });
  });
}

export function getTotalVotesArjun(req, res) {
  Vote.find({"name": "arjun"}).exec((err, arjun) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ status: true,
      data: arjun });
  });
}