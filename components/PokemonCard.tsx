import { useRouter } from "next/router";
import { FC } from "react";
import { Button, Card, CardActions, CardMedia, CardContent, Grid, Paper, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


import { typeColor } from '../constants/constants';


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  paperMedia: {
    padding: 2,
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

type Props = {
  data: any;
};

const PokemonCard: FC<Props> = ({ data, onClick }) => {
  const router = useRouter();
  const classes = useStyles();

  const renderPokeCard = () => (
    <Grid item key={data.id} xs={10} sm={5} md={3} onClick={onClick}>
      <Card className={classes.card}>
        <Paper variant="outlined" square className={classes.paperMedia}>
          <CardMedia
            className={classes.cardMedia}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            title={data.name}
          />
        </Paper>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5">
            {data.name}
          </Typography>
          <Grid>
            {data.types.map((type) => (
              <Button size="small" key={data.id + type.type.name} variant="contained" style={{ backgroundColor: typeColor[type.type.name], margin: 2 }}>
                {type.type.name}
              </Button>
            ))}
          </Grid>
        </CardContent>
        <CardActions>
          <Button size="medium" color="primary" onClick={onClick}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <>
      {renderPokeCard()}
    </>
  );
};

export default PokemonCard;
