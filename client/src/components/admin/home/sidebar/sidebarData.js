import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import MedicationIcon from '@material-ui/icons/DockTwoTone';
import ReportIcon from '@material-ui/icons/Report';
import BookIcon from '@material-ui/icons/Book';
import Speciality from '@material-ui/icons/LocalHospital';
import Settings from '@material-ui/icons/Settings';


export const SidebarData = [
  {
    title : 'Dashboard' ,
    icon : <HomeIcon /> ,
    link : '/admin/'
  },
    {
    title : 'User' ,
    icon : <PersonIcon /> ,
    link : '/admin/user'
  },
    {
    title : 'Doctor' ,
    icon : <MedicationIcon /> ,
    link : '/admin/doctor'
  },
    {
    title : 'Appointmets' ,
    icon : <BookIcon /> ,
    link : '/admin/appointments'
  },
     {
    title : 'Speciality' ,
    icon : <Speciality /> ,
    link : '/admin/speciality' 
  },
  {
    title : 'Reports' ,
    icon : <ReportIcon /> ,
    link : '/admin/report'
  },
  
]


